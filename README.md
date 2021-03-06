# React Todos App

## LET'S GET STARTED  

При первом обращении вам потребуется создать аккаунт, для этого используйте **Sigh up** и введите свои данные.  

В дальнейшем для входа используйте login страницу и **sigh in** кнопку.  

### E-mail and password валидируются, age предназначена для ввода чисел.  

Далее вы можете:  
1. Cоздавать новые задачи с **Create task**;  
2. Редактировать конкретную задачу с помощью кнопки **Edit**;  
3. Удалять задачу при редактировании **Del**;  
4. Изменять статус задачи с помощью *checbox* **is task checked?**;  

Также статус задачи отображается с помощью зеленого и красного индикатора. Где зеленый - задача выполнена, красный - задача еще не выполнена.  

## HOW IT WORKS

Данное приложение написано с помощью ReactJS с использованием hook'ов:  
* **useContext** - чтобы создать отдельную компоненту и собрать в ней *state*, который далее передается компонентом посредством createContext (чтобы не пробрасывать данные компонентам через *props*);
* **createContext** - создает Provider (поставщик) и при отрисовке, рендере, потребителя передает необходимый *state*;
* **useState** - создает пару переменная-функция для изменения этой переменной;
* **useEffect** - служит для управления различными *side effects* (побочные действия для функциональной компоненты), такие как запросы за данными, получение, изменение DOM и тд;  
Вторым параметром принимает список зависимостей;

### Redirect (Роутинг)

Роутинг исполнен с помощью *react-router-dom* и изменения адресов с помощью history (отсюда происходит проблема инициализации приложения на gh pages).

