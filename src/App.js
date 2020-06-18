import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");
      console.log(response.data);
      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);

    const newValues = repositories.map((repo) => {
      if (repo.id === id) {
        repo.likes += 1;
        return repo;
      }

      return repo;
    });

    setRepositories(newValues);
  }

  // isso simboliza um card
  function renderItem(repository) {
    return (
      <View style={styles.repositoryContainer}>
        <Text style={styles.repository}>{repository.title}</Text>

        <Text style={styles.techsInfo}>Tecnologias</Text>
        <View style={styles.techsContainer}>
          {repository.techs.map((tech) => (
            <Text style={styles.tech} key={tech}>
              {tech}
            </Text>
          ))}
        </View>

        <View style={styles.likesContainer}>
          <Text
            style={styles.likeText}
            // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
            testID={`repository-likes-${repository.id}`}
          >
            {repository.likes} curtidas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLikeRepository(repository.id)}
          // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
          testID={`like-button-${repository.id}`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => renderItem(repository)}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsInfo: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  techsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    textAlign: "center",
  },
});
