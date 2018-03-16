let userIds = [];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
  .then(function(){
    return knex.select('id').from('users')
  })
  .then(function(userId){
    userId.forEach(function(element){
      let index = 0;
      let key = Object.keys(element)[index];
      val = element[key];
      userIds.push(val);
    })
      return knex('tasks').insert([
        {user_id:userIds[0], item:'Task 1', task_date:"2018-03-25", completed:false},
        {user_id:userIds[0], item:'Task 2', task_date:"2018-03-30", completed:false},

        {user_id:userIds[1], item:'Task 1', task_date:"2018-03-29", completed:false},
        {user_id:userIds[1], item:'Task 2', task_date:"2018-03-20", completed:false},

        {user_id:userIds[2], item:'Task 1', task_date:"2018-03-30", completed:false},
        {user_id:userIds[2], item:'Task 2', task_date:"2018-03-18", completed:false}

      ]);
    });
};
