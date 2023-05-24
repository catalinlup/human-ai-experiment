FROM python:3.10

ARG env_file

COPY requirements.txt ./
RUN pip install python-dotenv
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ADD envs/$env_file src/.env

EXPOSE 9098

WORKDIR src

CMD ["sh", "-c", "flask run --host 0.0.0.0 --port $PORT"]
