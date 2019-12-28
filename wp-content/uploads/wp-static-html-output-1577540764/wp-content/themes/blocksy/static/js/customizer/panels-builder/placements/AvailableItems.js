import {
	createElement,
	Component,
	useState,
	Fragment
} from '@wordpress/element'
import DraggableItems from './DraggableItems'
import cls from 'classnames'
import Panel, { PanelMetaWrapper } from '../../../options/options/ct-panel'
import { getValueFromInput } from '../../../options/helpers/get-value-from-input'
import { __ } from 'ct-i18n'

import OptionsPanel from '../../../options/OptionsPanel'

import BuilderTemplates from './builder-sidebar/Templates'
import SecondaryItems from './builder-sidebar/SecondaryItems'
import InvisiblePanels from './builder-sidebar/InvisiblePanels'

const AvailableItems = ({
	allBuilderSections,
	builderValue,
	builderValueDispatch,
	inlinedItemsFromBuilder
}) => {
	// items | options
	const [currentTab, setCurrentTab] = useState('items')

	const secondaryItems =
		ct_customizer_localizations.header_builder_data.secondary_items.header
	const allItems = ct_customizer_localizations.header_builder_data.header

	const headerOptions =
		ct_customizer_localizations.header_builder_data.header_data
			.header_options

	return (
		<div className="ct-available-items">
			<h3 className="ct-title">{__('Global Header', 'blocksy')}</h3>

			<BuilderTemplates
				allBuilderSections={allBuilderSections}
				builderValue={builderValue}
				builderValueDispatch={builderValueDispatch}
			/>

			<div className="ct-option-description">
				{__(
					'Set one of these headers as a global one. You can edit them idependently.',
					'blocksy'
				)}
			</div>

			<div className="ct-tabs">
				<ul>
					{['items', 'options'].map(tab => (
						<li
							key={tab}
							onClick={e => {
								e.preventDefault()
								setCurrentTab(tab)
							}}
							className={cls({
								active: tab === currentTab
							})}>
							{
								{
									items: __('Elements', 'blocksy'),
									options: __('General', 'blocksy')
								}[tab]
							}
						</li>
					))}
				</ul>

				<div className="ct-current-tab">
					<SecondaryItems
						builderValue={builderValue}
						builderValueDispatch={builderValueDispatch}
						inlinedItemsFromBuilder={inlinedItemsFromBuilder}
						displayList={currentTab === 'items'}
					/>

					{currentTab === 'options' && (
						<OptionsPanel
							onChange={(optionId, optionValue) => {
								builderValueDispatch({
									type: 'BUILDER_GLOBAL_SETTING_ON_CHANGE',
									payload: { optionId, optionValue }
								})
							}}
							options={headerOptions}
							value={getValueFromInput(
								headerOptions,
								Array.isArray(builderValue.settings)
									? {}
									: builderValue.settings || {}
							)}
						/>
					)}
				</div>
			</div>

			<InvisiblePanels
				builderValue={builderValue}
				builderValueDispatch={builderValueDispatch}
			/>
		</div>
	)
}

export default AvailableItems
