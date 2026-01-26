'use client'

import { useMobileAppSettings } from '../MobileAppSettingsContext'
import { SectionGroup } from './SectionGroup'
import { ToggleSwitch } from '../fields/ToggleSwitch'
import { TextInput } from '../fields/TextInput'
import { SelectInput } from '../fields/SelectInput'

export function LocationsSection() {
  const { getValue, updateField } = useMobileAppSettings()

  return (
    <div className="mas-section">
      <div className="mas-section__header">
        <h2 className="mas-section__title">Locations</h2>
        <p className="mas-section__description">
          Configure location finder and store details
        </p>
      </div>

      <SectionGroup title="Location Finder" defaultOpen>
        <ToggleSwitch
          label="Enable Location Services"
          description="Request user location for nearby stores"
          checked={getValue('locations.enableLocationServices') as boolean ?? true}
          onChange={(value) => updateField('locations.enableLocationServices', value)}
        />
        <SelectInput
          label="Default View"
          value={getValue('locations.defaultView') as string ?? 'map'}
          onChange={(value) => updateField('locations.defaultView', value)}
          options={[
            { label: 'Map View', value: 'map' },
            { label: 'List View', value: 'list' },
          ]}
        />
        <TextInput
          label="Search Radius (miles)"
          placeholder="25"
          value={getValue('locations.searchRadius') as string ?? '25'}
          onChange={(value) => updateField('locations.searchRadius', value)}
        />
      </SectionGroup>

      <SectionGroup title="Store Details">
        <ToggleSwitch
          label="Show Hours"
          description="Display store operating hours"
          checked={getValue('locations.showHours') as boolean ?? true}
          onChange={(value) => updateField('locations.showHours', value)}
        />
        <ToggleSwitch
          label="Show Phone"
          description="Display store phone number with click-to-call"
          checked={getValue('locations.showPhone') as boolean ?? true}
          onChange={(value) => updateField('locations.showPhone', value)}
        />
        <ToggleSwitch
          label="Show Directions"
          description="Enable get directions button"
          checked={getValue('locations.showDirections') as boolean ?? true}
          onChange={(value) => updateField('locations.showDirections', value)}
        />
        <ToggleSwitch
          label="Show Amenities"
          description="Display store amenities and features"
          checked={getValue('locations.showAmenities') as boolean ?? true}
          onChange={(value) => updateField('locations.showAmenities', value)}
        />
      </SectionGroup>

      <SectionGroup title="Map Settings">
        <SelectInput
          label="Map Provider"
          value={getValue('locations.mapProvider') as string ?? 'apple'}
          onChange={(value) => updateField('locations.mapProvider', value)}
          options={[
            { label: 'Apple Maps', value: 'apple' },
            { label: 'Google Maps', value: 'google' },
          ]}
        />
        <ToggleSwitch
          label="Show Traffic"
          description="Display real-time traffic on map"
          checked={getValue('locations.showTraffic') as boolean ?? false}
          onChange={(value) => updateField('locations.showTraffic', value)}
        />
        <ToggleSwitch
          label="Cluster Markers"
          description="Group nearby location markers"
          checked={getValue('locations.clusterMarkers') as boolean ?? true}
          onChange={(value) => updateField('locations.clusterMarkers', value)}
        />
      </SectionGroup>
    </div>
  )
}
