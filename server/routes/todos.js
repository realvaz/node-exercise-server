const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", (req, res) => {  
    Todo.find({ active: true }, "title completed _id")
      .exec((error, todos) => {
        if (error) {
          res.status(400).json({ok: false, error});
        } else {
          res.json({ok: true, todos});
        }
      });
});
  
router.post("/", (req, res) => {
    const {title} = req.body;
    const todo = new Todo({title});

    todo.save((error, todoDB) => {
      if (error) {
        res.status(400).json({ok: false, error});
      } else {
        console.log("Tarea creada en BBDD", todoDB);
        res.json({ok: true, todo: todoDB});
      }
    });
});
  
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const {completed} = req.body;
    Todo.findByIdAndUpdate(
        id,
        {completed},
        {
            new: true, //devuelve el objeto actualizado
            runValidators: true, //aplica las validaciones del esquema del modelo
            context: 'query'  //necesario para las disparar las validaciones de mongoose-unique-validator
        },
        (error, todoDB) => {
            if (error) {
                res.status(400).json({ok: false, error});
            } else {
                res.json({ok: true, todo: todoDB});
            }
        }
    );
});
  
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    // Todo.findByIdAndRemove(id, (error, todoDB) => {
    //   if (error) {
    //     return res.status(400).json({ok: false, err});
    //   } else {
    //     res.json({ok: true, user: todoDB});
    //   }
    // });

    Todo.findByIdAndUpdate(
        id,
        { active: false },
        { new: true },
        (error, todoDB) => {
            if (error) {
                res.status(400).json({ok: false, error});
            } else if (todoDB == null) {
                res.status(400).json({
                    ok: false,
                    error: {
                        message: "Todo not found",
                    },
                });
            } else {
                res.json({ok: true, todo: todoDB});
            }
        }
    );
});

module.exports = router;
  