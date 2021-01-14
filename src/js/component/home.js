import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle

//create your first component
export function Home() {
	const [list, setList] = useState([]);

	const url = "https://assets.breatheco.de/apis/fake/todos/user/BooyahMando";

	useEffect(() => {
		syncList();
	}, []);

	const syncList = () => {
		return fetch(url)
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				setList(data);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const addTodo = list => {
		return fetch(url, {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				syncList();
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	const deleteEachTodo = list => {
		return fetch(url, {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				syncList();
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const [todo, setTodo] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
	};

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			let newList = list.concat([
				{
					label: todo,
					done: false
				}
			]);
			addTodo(newList);
			setTodo("");
		}
	};

	const deleteToDo = index => {
		setList(list.filter((item, i) => i !== index));
		// deleteEachTodo(list);
	};

	return (
		<div className="text-center mt-5">
			<div>
				<h1>To Do</h1>
				<form onSubmit={handleSubmit}>
					<ul className="list-unstyled">
						<li>
							{""}
							<input
								value={todo}
								type="text"
								placeholder="What do you need?"
								onChange={e => setTodo(e.target.value)}
								onKeyPress={e => handleKeyPress(e)}
							/>
						</li>
						{list.map((item, index) => {
							return (
								<li key={index}>
									{item.label}{" "}
									<span onClick={() => deleteToDo(index)}>
										<FontAwesomeIcon icon={faTrash} />
									</span>
								</li>
							);
						})}
						<li>
							{list.length} item
							{list.length > 1 || list.length === 0
								? "s"
								: null}{" "}
							left
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}
