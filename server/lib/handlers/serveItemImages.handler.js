import path from 'node:path';
import express from 'express';

export function createServeItemImagesHandler(config) {
  const assets = path.join(process.cwd(), config.assets.itemImages);
  return express.static(assets);
}
