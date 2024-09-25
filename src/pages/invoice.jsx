import { retrieveLaunchParams } from '@telegram-apps/sdk'
import { useEffect, useState } from 'react'
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

	const { initDataRaw } = retrieveLaunchParams()

	useEffect(() => {
		console.log(initDataRaw)
	}, [initDataRaw])

	const handleButtonClick = () => {
		navigator.clipboard
			.writeText('initDataRaw')
			.then(() => alert('Raw Init Data copied to clipboard!'))
			.catch(() => alert('Failed to copy Raw Init Data to clipboard!'))
	}

	return (
		<div
			style={{
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100%',
				width: '100vw',
				gap: '20px',
				display: 'flex',
			}}
		>
			<button
				style={{
					padding: '10px',
					background: 'transparent',
					color: 'white',
					border: '1px solid white',
					borderRadius: '10px',
					cursor: 'pointer',
				}}
				onClick={handleButtonClick}
			>
				Copy Raw Init Data
			</button>
			<input
				style={{
					padding: '10px',
					background: 'transparent',
					color: 'white',
					border: '1px solid white',
					borderRadius: '10px',
				}}
				value={value}
				placeholder='Enter invoice link'
				onChange={e => setValue(e.target.value)}
			/>
			<button
				style={{
					padding: '10px',
					background: 'transparent',
					color: 'white',
					border: '1px solid white',
					borderRadius: '10px',
					cursor: 'pointer',
				}}
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
