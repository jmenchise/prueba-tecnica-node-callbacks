import express from 'express';

const PORT = process.env.PORT ?? 3000;

const items = [
   {
      id: 1,
      content: 'Item 1'
   }
]

export const app = express();

app.use(express.json());

app.get('/items', (req, res) => {
   return res.json(items);
});

app.get('/items/:id', (req, res) => {
   const { id } = req.params
   const item = items.find(i => i.id === Number(id));
   if (!item) {
      res.status(404).json({ message: 'Item not Found!' });
      return
   }
   return res.status(200).json(item);
});

app.post('/items', (req, res) => {
   const item = req.body;
   const newItem = {
      id: items.length + 1,
      ...item
   };
   items.push(newItem);
   return res.status(200).json(newItem);
});

app.put('/items/:id', (req, res) => {
   const { id } = req.params;
   const item = req.body;
   const itemIndex = items.findIndex(i => i.id === Number(id));
   if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not Found!' });
      return
   }
   const updatedItem = {
      ...items[itemIndex],
      ...item
   }
   items[itemIndex] = updatedItem;
   return res.status(201).json(updatedItem);
})

app.delete('/items/:id', (req, res) => {
   const { id } = req.params;
   const itemIndex = items.findIndex(i => i.id === Number(id));
   if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not Found!' });
      return
   }
   const removedItem = items.splice(itemIndex, 1)[0];
   return res.status(200).json({ message: 'Item Deleted!', deletedItem: removedItem });
})

export const server = app.listen(PORT, () => {
   console.log(`Servidor express escuchando por el puerto ${PORT}`);
});

server.on('error', error => {
   console.error(`Error al escuchar por el puerto ${PORT}. Detalle: ${error.message} `);
});
