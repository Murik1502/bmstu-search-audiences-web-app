import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Loading from './Loading'
import Index from './pages'
import List from './pages/list'

export default function App() {
	const { tg } = useTelegram()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		tg.expand()
		tg.setHeaderColor('#000')
		tg.ready()
		tg.disableVerticalSwipes()
		setTimeout(() => setLoading(false), 1000)
	}, [tg])

	if (loading) {
		return <Loading />
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Index />} />
				<Route path={'list'} element={<List />} />
			</Routes>
		</BrowserRouter>
	)
}
