
import { QueryClient } from '@tanstack/react-query';
import { createDevConfig } from './development';
import { createProdConfig } from './production';

const getConfig = () => {
  if (import.meta.env.PROD) {
    return createProdConfig();
  }
  return createDevConfig();
};

export const createQueryClient = () => new QueryClient(getConfig());
