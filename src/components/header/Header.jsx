import React from 'react'
import {ReactComponent as Logo} from '../../assets/icons/logo.svg'
import {ReactComponent as GithubLogo} from '../../assets/icons/github-logo.svg' 

export default function Header() {
    return (
		<header className='header'>
			<Logo className='logo'></Logo>
			<h1>PERSOLVO</h1>
			<a className='github-link' href="https://github.com/RichQ-hub/Persolvo" target='_blank'>
				<GithubLogo className='github-logo' />
			</a>
		</header>
		
    )
}
