import { IPFS_GATEWAY } from '../index'
import { Team } from './types'

const teams: Team[] = [
  {
    id: 1,
    name: 'Syrup Storm',
    description: "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
    images: {
      lg: 'syrup-storm-lg.png',
      md: 'syrup-storm-md.png',
      sm: 'syrup-storm-sm.png',
      alt: 'syrup-storm-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/syrup-storm.png`,
    },
    background: 'syrup-storm-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
  {
    id: 2,
    name: 'Fearsome Flippers',
    description: "The flippening is coming. Don't get in these bunnies' way, or you'll get flipped, too!",
    images: {
      lg: 'fearsome-flippers-lg.png',
      md: 'fearsome-flippers-md.png',
      sm: 'fearsome-flippers-sm.png',
      alt: 'fearsome-flippers-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/fearsome-flippers.png`,
    },
    background: 'fearsome-flippers-bg.svg',
    textColor: '#FFFFFF',
    users: 0,
    points: 0,
  },
  {
    id: 3,
    name: 'Chaotic WDnerors',
    description: 'Can you stand the heat? Stay out of the kitchen or you might get burned to a crisp!',
    images: {
      lg: 'chaotic-wdnerors-lg.png',
      md: 'chaotic-wdnerors-md.png',
      sm: 'chaotic-wdnerors-sm.png',
      alt: 'chaotic-wdnerors-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/chaotic-wdnerors.png`,
    },
    background: 'chaotic-wdnerors-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
]

export default teams
