import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	resolve: {
		alias: {
			'@@': path.resolve(__dirname),
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 2222,
		strictPort: true,
		cors: true
	}
});
