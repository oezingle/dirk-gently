import { publish } from 'gh-pages';

publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/oezingle/dirk-gently.git', // Update to point to your repository
        user: {
            name: 'Oscar Zingle', // update to use your name
            email: 'oezingle@gmail.com' // Update to use your email
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);