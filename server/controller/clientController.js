import express from "express";
import createConnection from "../config/dbConn.js";
import emailValidotar from "email-validator";
const register =async(req,res)=>{
    try{
        const{first_name,last_name,mobile,email,project}=req.body;
       
        const connection=await createConnection();
        if(!emailValidotar.validate(email)){
            console.log(email);
            res.status(400).send({message:"Invalid Email"});
          
            }
             if (!first_name || !last_name || !email || !project){
                res.status(400).send({message: 'Missing fields'})
            }
           else{
            const [result]=await connection.execute(
                `INSERT INTO clients (first_name, last_name,mobile, email, project) VALUES(?,?,?,?,?)`,[
                    first_name,last_name,mobile,email,project]
                    );
                    await connection.close();
                    console.log(result);
                    res.status(201).send({id: result.insertId});
           }
                    }catch(error){
                        console.log(error);
                        res.status(500).send({
                            statusCode: 500,
                            message: "Error inserting the data into the database"
                            });
                        }
                    }
                    const getClients=async(req,res) =>{
                        try{
                            const connection=await createConnection();
                            const [results]=await connection.query('SELECT * FROM clients');
                            await connection.close();
                            res.json(results);
                            } catch(error){
                                console.log(error);
                                res.status(500).send({
                                    statusCode: 500,
                                    message: "Error getting the data from the database"
                                    })
                                    }
                                    }
                                    const edit = async (req, res) => {
                                        try {
                                            const { id } = req.params;
                                            const { newFirstName, newLastName, newMobile, newEmail, newProject } = req.body;
                                        
                                            const connection = await createConnection();
                                        
                                            const [result] = await connection.execute(
                                              `
                                              UPDATE clients 
                                              SET 
                                                first_name = ?,
                                                last_name = ?,
                                                mobile = ?,
                                                email = ?,
                                                project = ?
                                              WHERE id = ?
                                            `,
                                              [newFirstName, newLastName, newMobile, newEmail, newProject, id]
                                            );
                                        
                                            await connection.close();
                                        
                                            console.log(result);
                                        
                                            res.status(200).send({ message: "Client updated successfully" });
                                          } catch (error) {
                                            console.error(error);
                                            res.status(500).send({
                                              statusCode: 500,
                                              message: "Error updating the client in the database",
                                            });
                                          }
                                      };
                                      
                                      const deleteClient = async (req, res) => {
                                        try {
                                          const { id } = req.params;
                                          console.log(id);
                                      
                                          const connection = await createConnection();
                                      
                                          
                                          const [result] = await connection.execute(
                                            `DELETE FROM clients WHERE id = ?`,
                                            [id]
                                          );
                                      
                                          await connection.close();
                                      
                                          console.log(result);
                                      
                                          res.status(200).send({ message: "Client deleted successfully" });
                                        } catch (error) {
                                          console.log(error);
                                          res.status(500).send({
                                            statusCode: 500,
                                            message: "Error deleting the client from the database",
                                          });
                                        }
                                      };

                             export { register, getClients,edit,deleteClient};
                       