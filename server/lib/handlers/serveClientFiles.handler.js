import path from 'node:path';
import express from 'express';

export function createServeClientFilesHandler(config) {
  const assets = path.join(process.cwd(), config.assets.clientFiles);
  return express.static(assets);
}
