import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Keyboard } from "react-native";
import { getNotes, createNote, updateNote, deleteNote } from "../apis/index";

export default function Index() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch notes");
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchNotes();
    }, []);

    const handleAddOrUpdateNote = async () => {
      if (!title || !content) {
        Alert.alert("Validation", "Please enter both title and content.");
        return;
      }
      setLoading(true);
      try {
        if (editId) {
          await updateNote(editId, title, content);
          setEditId(null);
        } else {
          await createNote(title, content);
        }
        setTitle("");
        setContent("");
        Keyboard.dismiss();
        fetchNotes();
      } catch (error) {
        Alert.alert("Error", editId ? "Failed to update note" : "Failed to add note");
      }
      setLoading(false);
    };

    const handleEdit = (note: any) => {
      setTitle(note.title);
      setContent(note.content);
      setEditId(note._id || note.id);
    };

    const handleDelete = async (id: string) => {
      setLoading(true);
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (error) {
        Alert.alert("Error", "Failed to delete note");
      }
      setLoading(false);
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />
      <TextInput
        style={styles.content}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        editable={!loading}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddOrUpdateNote}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? (editId ? "Updating..." : "Saving...") : (editId ? "Update Note" : "Add Note")}</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id || item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.noteActions}>
              <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item._id || item.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No notes found.</Text>}
        refreshing={loading}
        onRefresh={fetchNotes}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2d3436",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#b2bec3",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#b2bec3",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    minHeight: 60,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0984e3",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#0984e3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  note: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    width: "100%",
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "#0984e3",
  },
  noteContent: {
    fontSize: 16,
    color: "#636e72",
    marginBottom: 10,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    width: '100%',
  },
  editBtn: {
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ffeaa7',
    borderRadius: 5,
  },
  deleteBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fab1a0',
    borderRadius: 5,
  },
  actionText: {
    color: '#2d3436',
    fontWeight: 'bold',
  },
});