import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(({ mode} ) => {
	return {
		base: './',
		plugins: [solid()],
	}
})
