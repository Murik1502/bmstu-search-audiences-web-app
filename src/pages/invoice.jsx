import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'

function handleInvoiceStatus(status) {
	if (status === 'paid') {
		alert('Invoice has been paid successfully!')
		// Handle post-payment actions
	} else if (status === 'cancelled') {
		alert('Invoice was cancelled.')
		// Handle cancellation actions
	} else {
		alert('Invoice status: ' + status)
		// Handle other statuses if necessary
	}
}

export function Invoice() {
	const [value, setValue] = useState('')

	const { tg } = useTelegram()

	return (
		<div>
			<h1>Invoice</h1>
			<input value={value} onChange={e => setValue(e.target.value)} />
			<button
				onClick={() => {
					try {
						tg.openInvoice(value, handleInvoiceStatus)
					} catch (e) {
						alert(e)
					}
				}}
			>
				open Invoice
			</button>
		</div>
	)
}
