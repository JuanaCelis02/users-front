<template>
	<div class="container">
		<nav-bar></nav-bar>
		<h2 class="my-4">Registro de usuarios</h2>
		<div class="d-flex justify-content-end my-2">
			<button class="btn btn-primary" @click="drawer = true">
				Crear Usuario
			</button>
		</div>
		<el-table :data="users" border style="width: 100%" @row-click="setEditUser">
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="email" label="Email" />
			<el-table-column prop="phoneNumber" label="Phone" />
			<el-table-column prop="numberDocument" label="Identificación" />
			<el-table-column prop="roles[0].roleName" label="Role" />
		</el-table>
		<div class="d-flex justify-content-end">
			<el-pagination
				class="my-3"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="totalUsers"
				@current-change="handlePageChange"
			/>
		</div>
	</div>

	<el-drawer v-model="drawer" @close="cancelDrawer">
		<template #header>
			<h2>{{ idUser ? "Editar" : "Crear" }} Usuario</h2>
		</template>
		<template #default>
			<h4>Informacion Personal</h4>
			<div class="row mb-3">
				<div class="col">
					<el-input
						v-model="formData.name"
						class="w-100"
						size="large"
						placeholder="Ingrese Nombre"
					/>
				</div>
				<div class="col">
					<el-input
						v-model="formData.lastName"
						class="w-100"
						size="large"
						placeholder="Ingrese Apellido"
					/>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col">
					<el-input
						v-model="formData.numberDocument"
						class="w-100"
						type="number"
						size="large"
						placeholder="Ingrese Numero de documento"
					/>
				</div>
				<div class="col">
					<el-input
						v-model="formData.phoneNumber"
						class="w-100"
						type="phone"
						size="large"
						:formatter="formatPhoneNumber"
						:parser="parsePhoneNumber"
						maxlength="10"
						placeholder="(123) 456 7890"
					/>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col">
					<el-input
						v-model="formData.email"
						class="w-100"
						type="email"
						size="large"
						placeholder="Ingrese Correo"
					/>
				</div>
				<div class="col">
					<el-input
						v-model="formData.bithDate"
						class="w-100"
						type="date"
						size="large"
						placeholder="Fecha de nacimiento"
					/>
				</div>
			</div>
			<h4>Credenciales</h4>
			<div class="row mb-3">
				<div class="col">
					<el-input
						v-model="formPassword.password1"
						class="w-100"
						size="large"
						type="password"
						show-password
						placeholder="Ingrese Contraseña"
					/>
				</div>
				<div class="col">
					<el-input
						v-model="formPassword.password2"
						class="w-100"
						size="large"
						type="password"
						@input="validatePasswordMatch"
						show-password
						placeholder="confirmar Contraseña"
					/>
				</div>
				<span v-if="formPassword.errorPassword" class="my-1 error">
					Error las contraseñas deben ser iguales
				</span>
			</div>
			<h4>Asignar Role</h4>
			<div class="row mb-3">
				<div class="col">
					<el-select
						v-model="role"
						class="w-100"
						placeholder="Asignar Role"
						size="large"
					>
						<el-option
							v-for="item in roles"
							:key="item.id"
							:label="item.roleName"
							:value="item.id"
						/>
					</el-select>
				</div>
				<div class="col">
					<el-button
						class="w-100"
						type="primary"
						plain
						size="large"
						@click="dialogVisible = true"
						>Crear Nuevo Role</el-button
					>
				</div>
			</div>
			<h4>Avatar</h4>
			<div class="mb-3">
				<input
					type="file"
					class="form-control"
					ref="fileInput"
					@change="handleFileChange"
				/>
				<div class="mt-3" v-if="imageUrl">
					<el-avatar :size="100" :src="imageUrl" />
				</div>
			</div>
		</template>
		<template #footer>
			<div style="flex: auto">
				<el-button v-if="idUser" type="danger" @click="deteleUserMethod">Eliminar Usuario</el-button>
				<el-button type="primary" @click="createUser">{{
					idUser ? "Guardar Cambios" : "Crear Usuario"
				}}</el-button>
			</div>
		</template>
	</el-drawer>

	<el-dialog
		v-model="dialogVisible"
		title="Crear Nuevo Role"
		width="40%"
		:before-close="closeDialog"
	>
		<div class="row mb-3">
			<div class="col">
				<el-input
					v-model="formRole.roleName"
					class="w-100"
					size="large"
					placeholder="Nombre Role"
				/>
			</div>
			<div class="col"></div>
		</div>
		<div class="row mb-3">
			<div class="col">
				<el-input
					v-model="formRole.descriptionRole"
					:rows="2"
					type="textarea"
					placeholder="Ingrese Descripción"
				/>
			</div>
			<div class="col"></div>
		</div>
		<div class="mb-3 d-flex flex-column">
			<h6>Estado del Role</h6>
			<el-switch
				v-model="formRole.statusRole"
				:on-value="true"
				:off-value="false"
				style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
			/>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">Cancelar</el-button>
				<el-button type="primary" @click="createRole"> Crear </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import { mapActions, mapState } from "vuex";
import uploadImage from "../../../helpers/uploadImage.js";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
	components: {
		NavBar,
	},

	data() {
		return {
			currentPage: 1,
			pageSize: 10,
			drawer: false,
			idUser: "",
			imageUrl: "",
			fileImg: null,
			dialogVisible: false,
			formData: {
				name: "",
				lastName: "",
				phoneNumber: "",
				password: "",
				email: "",
				bithDate: "",
				numberDocument: "",
			},
			role: "",
			formPassword: {
				password1: "",
				password2: "",
				errorPassword: false,
			},
			formRole: {
				roleName: "",
				descriptionRole: "",
				statusRole: true,
			},
		};
	},

	methods: {
		...mapActions("login", ["getSingleUserAction"]),
		...mapActions("users", [
			"getAllUsers",
			"getAllRoles",
			"createRoleAction",
			"createUserRole",
			"updatedUser",
			"getSingleUserEdit",
			"updatedUserRole",
			"deleteUser"
		]),
		async getSingleUser() {
			const id = sessionStorage.getItem("userId");
			await this.getSingleUserAction(id);
		},
		async getUsers(page) {
			await this.getAllUsers(page);
		},
		async getRoles() {
			await this.getAllRoles();
		},
		async handlePageChange(page) {
			this.currentPage = page;
			await this.getAllUsers(page);
		},
		handleFileChange(event) {
			const file = event.target.files[0];
			if (file) {
				this.imageUrl = URL.createObjectURL(file);
				const newFile = new File([file], "mi_archivo.jpg", {
					type: "image/jpeg",
				});
				this.fileImg = newFile;
			} else {
				this.imageUrl = null;
			}
		},
		async createRole() {
			try {
				await this.createRoleAction(this.formRole);
				this.getRoles();
				this.dialogVisible = false;
				ElMessage({
					message: "Role creado con exito",
					type: "success",
				});
			} catch (error) {
				ElMessage({
					message: `No se ha podido crear el rol ${error}`,
					type: "error",
				});
			}
		},
		cancelDrawer() {
			this.idUser = "";
			this.formData = {
				name: "",
				lastName: "",
				phoneNumber: "",
				password: "",
				email: "",
				bithDate: "",
				numberDocument: "",
			};
			this.role = ""
			this.imageUrl = "";
			(this.formPassword = {
				password1: "",
				password2: "",
				errorPassword: false,
			}),
				(this.drawer = false);
		},
		validatePasswordMatch() {
			if (this.formPassword.password1 !== this.formPassword.password2) {
				this.formPassword.errorPassword = true;
			} else {
				this.formPassword.errorPassword = false;
			}
		},
		formatPhoneNumber(value) {
			// Formatea el número de teléfono al estilo "(123) 456 7890"
			if (!value) return "";
			const formattedValue = value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
			const match = formattedValue.match(/^(\d{3})(\d{3})(\d{4})$/);
			if (match) {
				return `(${match[1]}) ${match[2]} ${match[3]}`;
			}
			return value;
		},
		parsePhoneNumber(value) {
			// Analiza el valor del campo para eliminar cualquier formato adicional
			return value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
		},
		closeDialog() {
			this.formRole = {
				roleName: "",
				descriptionRole: "",
				statusRole: true,
			};
			this.dialogVisible = false;
		},
		async setEditUser(row) {
			this.idUser = row.id;
			const singleUser = await this.getSingleUserEdit(this.idUser);
			this.formData = {
				name: singleUser.name,
				lastName: singleUser.lastName,
				phoneNumber: singleUser.phoneNumber,
				email: singleUser.email,
				bithDate: singleUser.bithDate,
				numberDocument: singleUser.numberDocument,
			};
			(this.role = singleUser?.roles[0]?.id),
				(this.imageUrl = singleUser.imageUrl);
			this.drawer = true;
		},
		async createUser() {
			try {
				if (this.idUser) {
					if (this.formPassword.password1) {
						this.formData.password = this.formPassword.password1;
					}
					if (this.imageUrl) {
						const picture = await uploadImage(this.fileImg);
						this.formData.imageUrl = picture;
					}
					await this.updatedUser({ idUser: this.idUser, user: this.formData });
					if (this.role) {
						const res = await this.updatedUserRole({
							userId: this.idUser,
							role: this.role,
						});
						if (res) {
							ElMessage({
								message: "Usuario editado con exito",
								type: "success",
							});
						}
						this.getUsers(this.currentPage)
					}
				} else {
					this.formData.password = this.formPassword.password1;
					const picture = await uploadImage(this.fileImg);
					this.formData.imageUrl = picture;
					await this.createUserRole({ user: this.formData, role: this.role });
					ElMessage({
						message: "Usuario creado con exito",
						type: "success",
					});
					this.drawer = false;
				}
			} catch (error) {
				ElMessage({
					message: `No se ha podido realizar los cambios, ${error}`,
					type: "error",
				});
			}
		},
		async deteleUserMethod() {
			ElMessageBox.confirm(
    '¿Desea eliminar el usuario?',
    {
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(() => {
			this.deleteUser(this.idUser)
      ElMessage({
        type: 'success',
        message: 'Usuario Eliminado',
      })
			this.drawer = false;
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación Cancelada',
      })
    })
		}
	},

	computed: {
		...mapState("users", ["users", "totalUsers", "roles"]),
		paginatedUsers() {
			const startIndex = (this.currentPage - 1) * this.pageSize;
			const endIndex = startIndex + this.pageSize;
			return this.users.slice(startIndex, endIndex);
		},
	},

	created() {
		this.getSingleUser();
		this.getUsers();
		this.getRoles();
	},
};
</script>

<style>
.error {
	color: red;
}
</style>
