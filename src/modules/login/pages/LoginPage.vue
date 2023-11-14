<template>
	<div class="container mt-5">
		<div class="col-md-4 card p-5 offset-md-4">
			<h2 class="mb-3">Iniciar Sesión</h2>
			<form @submit.prevent="loginMethod">
				<div class="mb-3">
					<label for="email" class="form-label">Email</label>
					<el-input
						name="email"
						v-model="email"
						type="email"
						placeholder="Ingrese Correo"
					/>
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Contraseña</label>
					<el-input
						name="password"
						v-model="password"
						type="password"
						show-password
						placeholder="Ingrese contraseña"
					/>
				</div>
				<button type="submit" class="btn btn-primary">Iniciar Sesión</button>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},

	methods: {
		...mapActions("login", ["loginAction"]),
		async loginMethod() {
			try {
				const credentials = {
					email: this.email,
					password: this.password,
				};
				const resLogin = await this.loginAction(credentials);
				if (resLogin) {
          this.$router.push('/main')
				} else {
					ElMessage({
					message: "Credenciales Invalidas",
					type: "error",
				});
				}
			} catch (error) {
				ElMessage({
					message: `${error}`,
					type: "error",
				});
			}
		},
	},
};
</script>

<style></style>
