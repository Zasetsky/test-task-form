import {
	createRouter, createWebHistory,
} from 'vue-router';
import Form from '../views/Form.vue';
import SuccessPage from '../views/SuccessPage.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [{
		path: '/',
		name: 'Form',
		component: Form
	}, {
		path: '/success',
		name: 'Success',
		component: SuccessPage
	}]
});