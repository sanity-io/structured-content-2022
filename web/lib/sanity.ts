import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';
import type { Figure } from '../types/Figure';
import { projectConfig } from './config';

export const imageUrlFor = (source: Figure) =>
  createImageUrlBuilder(projectConfig).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(projectConfig);

export const useCurrentUser = createCurrentUserHook(projectConfig);
