export function useDeviceLayout({
  isMobile
}){
	const screenWidth = window.innerWidth

  return (
    isMobile && screenWidth < 640 ? true : false
  )
}
