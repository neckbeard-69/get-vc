package main

import (
	"log"
	"log/slog"
	"os"
	"os/user"
	"path/filepath"
)

// create the repos dir if it does not exist
func init() {

	usr, err := user.Current()
	if err != nil {
		panic(err)
	}

	path := filepath.Join(usr.HomeDir, "git-repos")
	err = os.MkdirAll(path, 0755)
	if err != nil {
		panic(err)
	}
}

func main() {
	logFile, err := os.OpenFile("git_service.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		panic(err)
	}
	defer logFile.Close()
	log.SetOutput(logFile)

	cfg := config{
		addr: ":8080",
	}

	api := application{
		config: cfg,
	}

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	handler := api.mount()
	if err := api.run(handler); err != nil {
		slog.Error("Server has failed to start", "error", err)
	}

}
