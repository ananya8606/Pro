import React from 'react';
import { Container } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
	return (
		<Container>
			<footer className='footer-container'>
				<div className='footer-icons'>
					<a
						href='https://github.com/ananya8606'
						aria-label='github account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-github footer-icon' />
					</a>
					<a
						href='https://www.linkedin.com/in/ananyaiiitr/'
						aria-label='linkedin account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-linkedin-in footer-icon' />
					</a>
					<a
						href='https://twitter.com/AnanyaG33442335'
						aria-label='twitter account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-twitter footer-icon' />
					</a>
					<a
						href='mailto:ananyaiiitr@gmail.com'
						aria-label='developer portfolio'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fas fa-envelope footer-icon' />
					</a>
				</div>
      <footer class="bg-dark text-center navbar-dark text-lg-start">
  <div class="text-center text-white p-3">
				<div className='footer-copyright'>
        © 2022 Copyright:
        <a class="text-white p-3" href="https://mdbootstrap.com/">Ananya Gupta</a>
        </div>
      </div>
    </footer>
			</footer>
		</Container>
	);
};

export default Footer;
