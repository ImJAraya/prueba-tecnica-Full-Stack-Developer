# Proyecto ELD Log App (usando ORS)

Este proyecto es una aplicación full-stack usando Django (backend) y React en JSX (frontend),
y utiliza solamente la API de OpenRouteService para geocoding y routing.

## Requisitos

- Python 3.x
- Node.js y npm
- Clave gratuita de OpenRouteService

## Estructura

```
eld-assessment-ors/
├── README.md
├── .gitignore
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── logs/
│       ├── models.py
│       ├── utils.py
│       ├── views.py
│       └── migrations/__init__.py
└── frontend/
    ├── package.json
    ├── .env.example
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.jsx
        ├── services/geo.js
        └── components/
            ├── TripForm.jsx
            └── MapView.jsx
```

## Cómo levantar

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv/Scripts/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```



- El backend estará en http://localhost:8000

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edita .env con tu API_KEY y backend URL
npm start
```
en src/services/geo.js modificar en la url del fetch, boundary.country=CRI a conveniencia o eliminar si es necesario.
- El frontend estará en http://localhost:3000
