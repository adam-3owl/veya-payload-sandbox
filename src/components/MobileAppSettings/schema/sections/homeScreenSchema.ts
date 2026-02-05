import type { UISectionSchema } from '../types'
import { custom } from '../builders'
import { HomeScreenPageBuilder } from '../../sections/HomeScreenPageBuilder'

export const homeScreenSchema: UISectionSchema = {
  title: 'Home Screen',
  description: 'Build the home screen layout for guest and logged-in customers',
  pathPrefix: 'homeScreen',
  fields: [
    custom(HomeScreenPageBuilder),
  ],
}
