import { responsiveClassesFor } from './footer'

function changeTagName(node, name) {
	var renamed = document.createElement(name)

	;[...node.attributes].map(({ name, value }) => {
		renamed.setAttribute(name, value)
	})

	while (node.firstChild) {
		renamed.appendChild(node.firstChild)
	}

	return node.parentNode.replaceChild(renamed, node)
}

export const renderSidebar = () => {
	const sidebar = document.querySelector('.ct-sidebar')

	if (!sidebar) return

	document.querySelector(
		'.ct-sidebar'
	).parentNode.dataset.type = wp.customize('sidebar_type')()

	document.querySelector('.ct-sidebar').removeAttribute('data-widgets')

	if (
		wp.customize('separated_widgets')() === 'yes' &&
		wp.customize('sidebar_type')() === 'type-2'
	) {
		document.querySelector('.ct-sidebar').dataset.widgets = 'separated'
	}

	;[...document.querySelectorAll('.ct-sidebar .widget-title')].map(el =>
		changeTagName(el, wp.customize('widgets_title_wrapper')())
	)
}

wp.customize('separated_widgets', val =>
	val.bind(to => {
		renderSidebar()
	})
)

wp.customize('widgets_title_wrapper', val => val.bind(to => renderSidebar()))

wp.customize('has_sticky_sidebar', val =>
	val.bind(to => {
		const sidebar = document.querySelector('.ct-sidebar')
		if (!sidebar) return

		sidebar.removeAttribute('data-sticky')

		if (to !== 'yes') return

		document.querySelector('.ct-sidebar').dataset.sticky = ''
	})
)

wp.customize('sidebar_type', val => val.bind(to => renderSidebar()))

wp.customize('sidebar_visibility', val =>
	val.bind(to => {
		const sidebar = document.querySelector('.ct-sidebar')
		if (!sidebar) return

		responsiveClassesFor(
			'sidebar_visibility',
			document.querySelector('.ct-sidebar').parentNode
		)
	})
)
