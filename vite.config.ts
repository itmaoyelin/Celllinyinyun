import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 选项写法
      '/api': {
        // target: 'http://localhost:3000',    //实际请求的接口地址
        target: 'https://www.mylapi.icu', 
        changeOrigin: true,             //是否伪装
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
   
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带marquee的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('marquee')
        }
      }
    }),
    visualizer({
      open: true
    }),
    Components({
      resolvers: [VantResolver()],      //引入vant
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  
  build:{
    chunkSizeWarningLimit:2000,
    cssCodeSplit:true, //css 拆分
    sourcemap:false, //不生成sourcemap
    minify:false, //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
    assetsInlineLimit:5000 //小于该值 图片将打包成Base64 
},
})
