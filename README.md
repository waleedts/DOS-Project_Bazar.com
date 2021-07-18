# DOS-Project_Bazar.com
The Distributed Operating Systems Course Project which is a Multi-tier Online Book Store called Bazar.com
## How to run
- You need a Docker Client to run this program,[Docker](https://www.docker.com/get-started)
- Navigate to the project home directory using the terminal
- The docker client has Docker Compose included so using the terminal run the command
`docker-compose up`
- The three services should be running
- The frontend can be accessed on [localhost:8080](http://localhost:8080)
- The catalog can be accessed on [localhost:8081](http://localhost:8081)
- The orders can be accessed on [localhost:8082](http://localhost:8082)

## Orders Server Endpoints
- To purchase a book use : `POST \api\purchase\item\{itemNumber}`

## Catalog Server Endpoints
- To get all items in the catalog : `GET \api\query\item`
- To get an item in the catalog : `GET \api\query\item\{itemNumber}`
- To get all items of a topic : `GET \api\query\subject\{subjectName}`
- To update an items price and/or stock : `PATCH \api\update\item\{itemNumber}`,
  with a json body in the form     
  **{
  "cost":{theNewCost},
  "InStock":{theNewStock}
  }**
     or   
  **{
  "cost":{theNewCost}
  }**
  or     
  **{
  "InStock":{theNewStock}
  }**
  # How it works
We wrote the code in NodeJs using the express framework as a backend, and React framework on the front end,
the reasons for this choice are very simple:
- One Programming language for the backend and front end.
- Simple short and self-explanatory code.
- As the design is very basic and simple the performance is not a very big concern.
  
The design implemented consists of three separate components one on the frontend and two on the backend,
namely the frontend, Orders and Catalog servers. The main server is the Catalog which has the data on products,the orders server has the orders info and connects to the catalog to read and modify an item's info when an order comes.
The frontend has a simple GUI which calls the two backend servers.
We wrote a docker file which builds a docker image for each server to work separately independently, then we connected the images/dockerfile with a docker compose file that connects the containers.
  # Considerations and Possible Improvements
The design has a few problems and REST is not good for transactions,
there's a race condition in the purchase call.
It could be solved by making the purchase call directly 
on the catalog server and saving the output on the orders side.
The two databases could be combined into a single database that's tightly connected.

  # Cases in which it works incorrectly 
The only case is when two purchase orders are happening at the same time, both of them read the amount in stock, decrement it then write the same value twice.

Ex:
Service A: Reads Stock 5
Service B: Reads Stock 5
Service A: Write Stock 4
Service B: Write Stock 4 again instead of 3
