// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["lucide-react"]
        }
      }
    },
    // Ensure all public files are copied to dist
    copyPublicDir: true,
    // Ensure JSON files are treated as assets
    assetsInlineLimit: 0
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"]
  },
  server: {
    port: 5173,
    host: true,
    // Ensure JSON files are served with correct MIME type in development
    middlewareMode: false
  },
  // Ensure public directory is properly handled
  publicDir: "public",
  // Add specific handling for JSON files
  assetsInclude: ["**/*.json"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgaWNvbnM6IFsnbHVjaWRlLXJlYWN0J11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gRW5zdXJlIGFsbCBwdWJsaWMgZmlsZXMgYXJlIGNvcGllZCB0byBkaXN0XG4gICAgY29weVB1YmxpY0RpcjogdHJ1ZSxcbiAgICAvLyBFbnN1cmUgSlNPTiBmaWxlcyBhcmUgdHJlYXRlZCBhcyBhc3NldHNcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdsdWNpZGUtcmVhY3QnXVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIGhvc3Q6IHRydWUsXG4gICAgLy8gRW5zdXJlIEpTT04gZmlsZXMgYXJlIHNlcnZlZCB3aXRoIGNvcnJlY3QgTUlNRSB0eXBlIGluIGRldmVsb3BtZW50XG4gICAgbWlkZGxld2FyZU1vZGU6IGZhbHNlXG4gIH0sXG4gIC8vIEVuc3VyZSBwdWJsaWMgZGlyZWN0b3J5IGlzIHByb3Blcmx5IGhhbmRsZWRcbiAgcHVibGljRGlyOiAncHVibGljJyxcbiAgLy8gQWRkIHNwZWNpZmljIGhhbmRsaW5nIGZvciBKU09OIGZpbGVzXG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5qc29uJ11cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDN0IsT0FBTyxDQUFDLGNBQWM7QUFBQSxRQUN4QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLGVBQWU7QUFBQTtBQUFBLElBRWYsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsY0FBYztBQUFBLEVBQ2hEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUE7QUFBQSxFQUVBLFdBQVc7QUFBQTtBQUFBLEVBRVgsZUFBZSxDQUFDLFdBQVc7QUFDN0IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
