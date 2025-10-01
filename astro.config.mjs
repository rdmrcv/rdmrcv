import pdf from "astro-pdf";
import { defineConfig } from "astro/config";
import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pdfOutputPath = "/files/profile.pdf";
const pdfPublicDir = fileURLToPath(new URL("./public/", import.meta.url));
const enablePdfBuild = process.env.ASTRO_PDF === "true";
const isCi = process.env.CI === "true";
const pdfOutputDirPath = dirname(pdfOutputPath);
const pdfOutputFilename = basename(pdfOutputPath);
const pdfOutputBasename = basename(pdfOutputPath, ".pdf");

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
          launch: isCi
            ? {
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
              }
            : undefined,
          pages: {
            "/": pdfOutputPath,
          },
          runBefore: async (dir) => {
            const outDir = fileURLToPath(dir);
            const outputDirPath = resolve(outDir, `.${pdfOutputDirPath}`);
            let existingFiles = [];
            try {
              existingFiles = await readdir(outputDirPath);
            } catch (error) {
              const code = error instanceof Error && "code" in error ? error.code : null;
              if (code !== "ENOENT") {
                throw error;
              }
              return;
            }
            const staleFiles = existingFiles.filter(
              (filename) =>
                filename === pdfOutputFilename ||
                (filename.startsWith(`${pdfOutputBasename}-`) && filename.endsWith(".pdf"))
            );
            await Promise.all(staleFiles.map((filename) => rm(resolve(outputDirPath, filename), { force: true })));
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
