import pdf from "astro-pdf";
import { defineConfig } from "astro/config";
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pdfOutputPath = "/files/profile.pdf";
const pdfPublicDir = fileURLToPath(new URL("./public/", import.meta.url));
const enablePdfBuild = process.env.ASTRO_PDF === "true";

export default defineConfig({
  srcDir: "src",
  prefetch: true,
  site: "https://dmrcv.me",
  output: "static",
  build: {
    format: "directory",
  },
  integrations: [
    enablePdfBuild
      ? pdf({
          pages: {
            "/": pdfOutputPath,
          },
          runAfter: async (dir, generated) => {
            if (!generated.includes(pdfOutputPath)) {
              return;
            }
            const outDir = fileURLToPath(dir);
            const sourcePath = resolve(outDir, `.${pdfOutputPath}`);
            const publicPath = resolve(pdfPublicDir, `.${pdfOutputPath}`);
            await mkdir(dirname(publicPath), { recursive: true });
            await copyFile(sourcePath, publicPath);
          },
        })
      : null,
  ].filter(Boolean),
});
