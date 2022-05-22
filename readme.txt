    Cum deschizi site ul esti intampinat cu o scurta descriere si functionalitatea acestuia.
    In meniul de navigare din coltul din dreapta sus, daca nu esti logat, meniul de home, 
sign up pentru ati face un cont nou si login pentru a te loga. Daca esti logat va aparea 
meniul de find partner unde poti sa iti gasesti un partener si sa afli mai multe detalii despre acesta,
account unde poti sa ti schimbi numele descrierea sau orasul, si logout pentru a te deloga.
    Pe pagina de find partner daca nu ai deja un partener, iti va aparea un buton pe care atunci 
cand il apesi vei incepe sa caut un partener( atunci cand site ul gaseste un partener din pacate 
nu se pa updata automat si va trebui sa dati refresh). Daca ai deja un partener, iti va aparea detalii
despre acesta (cum ar fi numele, descrierea, sexul si varsta) dar si informatii despre intalnirea 
aranjata de site( numele locului, data si o harta cu un marker pe pozitia respectiva). Locatia va fi 
aleasa dintr un fisier json astfel incat pentru fiecare oras va fi un anumit punc de intalnire.

    Front end ul este facut in react cu javascript si tailwind.
    Back end ul este facut in python. Ca module foloses flask pentru server, Werkzeug pentru a genera hasul
parolei, sqlachemy pentru baza de date. In plus, folosesc redis pentru server sided session dar din cauza
unor dificultati la host am decis sa foloses client side session.
