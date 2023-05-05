import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactLoading from "react-loading";
import Routes from './Routes'
import { useDeviceLayout } from './components/utilities/useCustomLayout'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Wrapper = styled.div`
  background: #f5f6ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
`
const themeTIPO_ADMIN = createTheme({
	typography: {
		fontFamily: [
			'-apple-system',
			'Graviola Soft',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	palette: {
		type: 'light',
		primary: {
			main: '#00c5cc',
		},
		secondary: {
			main: '#303030',
		},
	},
});

const MainApp = () => {
	const [loading, setLoading] = useState(true);
	const isMobile = useDeviceLayout({ isMobile: true })

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000)
	}, [])

	const customProps = { isMobile }

	if (loading) {
		return (
			<Wrapper>
				<ReactLoading
					type="spin"
					color="#00c5cc"
					height={isMobile ? '10%' : '2%'}
					width={isMobile ? '10%' : '2%'}
				/>
			</Wrapper>
		)
	} else {
		return (
			<ThemeProvider theme={themeTIPO_ADMIN}>
				<Routes {...customProps} />
			</ThemeProvider>
		)
	}
}

export default MainApp;
