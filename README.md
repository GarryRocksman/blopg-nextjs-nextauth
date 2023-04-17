# Next.js Blog with NextAuth

This project is a feature-rich blog application built with Next.js, featuring user authentication via NextAuth using Google as the authentication provider.

## Functionality

- User authentication with Google
- Create, read, update, and delete (CRUD) operations for blog posts
- Rich text editing with ReactQuill
- Dynamic import for code splitting and performance optimization
- Custom 404 error page
- Responsive design with Tailwind CSS

## Technologies

- [Next.js](https://nextjs.org/) for server-rendered React applications
- [NextAuth](https://next-auth.js.org/) for user authentication with Google
- [Prisma](https://www.prisma.io/) for database connection
- [TRPC](https://trpc.io/) for API route handling
- [ReactQuill](https://github.com/zenoamaro/react-quill) for rich text editing
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Getting Started

To run the project, follow these steps:

1. Clone the repository:

#### git clone https://github.com/GarryRocksman/blopg-nextjs-nextauth
#### cd nextjs-blog-nextauth


2. Install dependencies:

#### npm install


3. Create a `.env.local` file in the project root and add the necessary environment variables for Google authentication and database connection.

4. Run the development server:

##### npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## Contributing

If you want to contribute to this project, please submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.