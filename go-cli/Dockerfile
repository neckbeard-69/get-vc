FROM golang:1.25-alpine

WORKDIR /app
COPY go.mod ./
RUN go mod download

RUN go install github.com/air-verse/air@latest

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["air", "-c", ".ari.toml"]
