/**
 * Performance Configuration Constants
 */
export const PERFORMANCE = {
  MAX_DPR: 2,
  REDUCED_PARTICLE_MULTIPLIER: 0.35,
  INTERSECTION_THRESHOLD: 0.15,
  ENABLE_DEV_PERF_LOGS: import.meta.env.MODE === 'development',
  ENABLE_LOW_END_CANVAS_UNMOUNT: false,
};
