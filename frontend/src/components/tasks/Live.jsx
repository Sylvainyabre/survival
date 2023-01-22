import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import  React from 'react';
import { Stream } from './Stream';
 
const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});
 
// Pass client to React Context Provider
function Live() {
  return (
    <LivepeerConfig client={livepeerClient}>
      <Stream/>
    </LivepeerConfig>
  );
}

export default Live