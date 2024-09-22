import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'

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
						tg.openInvoice(value, callback => {
							console.log(callback)
							alert(callback)
						})
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
