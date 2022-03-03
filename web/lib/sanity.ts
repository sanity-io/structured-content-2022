import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';
import { projectConfig } from './config';

export const imageUrlFor = (source) =>
  createImageUrlBuilder(projectConfig).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(projectConfig);

export const useCurrentUser = createCurrentUserHook(projectConfig);
