/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(private)` | `/(private)/(tabs)` | `/(private)/(tabs)/home` | `/(private)/(tabs)/map` | `/(private)/home` | `/(private)/location` | `/(private)/map` | `/(tabs)` | `/(tabs)/home` | `/(tabs)/map` | `/_sitemap` | `/home` | `/location` | `/map` | `/register`;
      DynamicRoutes: `/(private)/location/${Router.SingleRoutePart<T>}` | `/location/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(private)/location/[locationId]` | `/location/[locationId]`;
    }
  }
}
