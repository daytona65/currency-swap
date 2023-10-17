import { useState } from "react"
import Link from "next/link"
import styles from "../styles/Header.module.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { GiUnicorn } from 'react-icons/gi';

function Navbar() {
		
	const [isActive, setIsActive] = useState(false)

	return (
		<header className={styles.header}>
			<nav className={`${styles.container} ${styles.container_flex}`}>
				<Link href="/"className={styles.logo} >
					<GiUnicorn size={50}/>
					<div className={styles.logotxt}>
						<h2 className={styles.logo_title}>Fancy Form</h2>
					</div>
				</Link>

				{/* Hamburger menu for mobile view 
				<img
					src="/hamburger_menu.svg"
					alt="An SVG of hamburger menu"
					className={`${styles.hidden} ${styles.hamburger}`}
					onClick={() => setIsActive(prev => !prev)}
				/> */}

				<div className={`${styles.nav_links} ${isActive ? styles.nav_active : ""}`}>
					<Link href="/" className={styles.nav_link}>
						Swap
					</Link>
					<Link href="/" className={styles.nav_link}>
						Tokens
					</Link>
					<Link href="/" className={styles.nav_link}>
						NFTs
					</Link>
					<Link href="/" className={styles.nav_link}>
						Pools
					</Link>
					<Link href="/" className={styles.nav_link}>
						FAQ
					</Link>
					<ConnectButton
						accountStatus="address"
						chainStatus="none"
						showBalance={false}
					/>
				</div>
			
			</nav>
		</header>
	)
}

export default Navbar