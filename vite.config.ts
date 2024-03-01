import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(({ mode} ) => {
	let base = mode === 'github' ? '/wpctactics25': './'
	return {
		base,
		plugins: [solid()],
	}
})
