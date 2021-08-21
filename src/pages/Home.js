import React from 'react';
import MenuBar from '../components/MenuBar';
import SideBar from '../containers/SideBar';

const SidebarExampleSidebar = () => {
    const [visible, setVisible] = React.useState(false);
    function toggleMenu() {
        setVisible(!visible);
    }
    return (
        <div>
            <MenuBar onToggleMenu={toggleMenu} />
            <SideBar />
            {/*
            <Sidebar.Pushable style={{ transform: 'none' }} as={Segment}>
                <SideBar visible={visible} />
                <Sidebar.Pusher>
                    <RegisterForm />
                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laudantium maxime voluptates iste id, quod
                            eaque provident eligendi harum modi unde voluptatem
                            fugit necessitatibus, iusto officiis rerum nam
                            debitis veritatis? Maxime?
                        </p>
                        <p>
                            Ab deleniti pariatur quibusdam! Dolorum dolores,
                            consequatur dolorem quos deserunt dignissimos
                            assumenda perspiciatis nobis impedit animi iste
                            dolore reiciendis iusto, ut pariatur? Atque vel
                            consequuntur voluptatibus cupiditate earum illum
                            explicabo?
                        </p>
                        <p>
                            Facere deleniti atque quidem, aperiam fugit eligendi
                            qui officia suscipit nam assumenda vel sequi soluta,
                            totam ex omnis sint ad voluptatem cum recusandae!
                            Placeat nihil quam atque beatae, fugit ad.
                        </p>
                        <p>
                            Voluptatem ipsum, architecto soluta, officia commodi
                            quia hic quis doloribus dolorum aliquam perferendis,
                            sint qui quasi ratione expedita rerum alias.
                            Quibusdam nostrum soluta harum odit unde doloribus
                            dolorum voluptatibus similique.
                        </p>
                        <p>
                            Hic quaerat quidem minima. Mollitia veritatis eos
                            harum expedita rerum dicta commodi sapiente ratione,
                            consequatur officiis delectus voluptatem quis
                            cupiditate asperiores sequi reprehenderit minus quas
                            eaque a doloremque odit nam.
                        </p>
                        <p>
                            Eius quo excepturi enim modi alias, numquam esse eos
                            adipisci architecto officia vero sapiente
                            accusantium error fuga inventore consequuntur
                            molestias soluta consectetur, ab maxime! In est quis
                            at a nostrum.
                        </p>
                        <p>
                            Aliquam dicta, aut provident consectetur molestiae
                            dolore velit qui optio! Inventore adipisci hic vel
                            est neque! Excepturi dolor veritatis modi quod
                            quidem nobis, omnis maxime nostrum ipsa obcaecati
                            aperiam enim?
                        </p>
                        <p>
                            Tempore culpa perspiciatis tempora ullam expedita
                            velit ab doloribus ad illum. Sit, libero, illum
                            facilis fugit hic aspernatur in accusantium
                            perferendis, quo temporibus iusto voluptatem. Sunt
                            hic qui consequuntur tenetur.
                        </p>
                        <p>
                            Suscipit fugit ex at aspernatur et, deleniti
                            voluptate rem? Rem eaque fugiat saepe veritatis
                            repudiandae excepturi! Explicabo, necessitatibus
                            esse. Voluptate dolorum nesciunt optio nihil in,
                            blanditiis soluta ratione dignissimos reprehenderit.
                        </p>
                        <p>
                            Magni velit accusantium facere quaerat suscipit
                            delectus quia, temporibus fuga, aliquid quidem
                            consequuntur ab! Provident, exercitationem veritatis
                            sequi atque error incidunt doloribus ratione
                            consequuntur adipisci molestias, neque libero quas
                            quisquam!
                        </p>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>

            */}
        </div>
    );
};

export default SidebarExampleSidebar;
