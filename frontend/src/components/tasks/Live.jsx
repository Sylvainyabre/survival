import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import  React from 'react';
import { Stream } from './Stream';
 
const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "a6905614-def7-4fe2-93b8-ceac3abd182a",
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