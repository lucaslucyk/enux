# Steps

- create src folder
- create backend and frontend folders
- move to frontend and create vite app
  ```bash
  npm create vite@latest enux -- --template react
  cd enux/
  npm install
  npm run dev
  ```
- check project run
- install tailwindcss
  ```bash
  npm i -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- install deps
  ```bash
  npm i react-toastify react-router-dom @headlessui/react @heroicons/react@v1
  ```
- move styles
- create navbar and footer nav components with export default
- create layout hocs

--- 
- create environment and install dependencies
  ```bash
  py -m venv .venv
  pipenv install
  pipenv install "django<5.0.0,>4.2.0"
  ```
- cd to backend folder and create django project
  ```bash
  django-admin startproject enux .
  ```

- create apps folders and create apps
  ```bash
  py manage.py startapp auth apps/auth
  py manage.py startapp products apps/products
  py manage.py startapp coupons apps/coupons
  py manage.py startapp reviews apps/reviews
  py manage.py startapp store apps/store
  py manage.py startapp shipping apps/shipping
  py manage.py startapp payments apps/payments
  ```
- update settings and each app name `apps.{name}`