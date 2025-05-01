			package com.musicapp.music_backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.musicapp.music_backend.entities.AR_rahman;
import com.musicapp.music_backend.entities.Alka_yagnik;
import com.musicapp.music_backend.entities.Arjit_singh;
import com.musicapp.music_backend.entities.Bruno_mars;
import com.musicapp.music_backend.entities.Diljit_dosanjh;
import com.musicapp.music_backend.entities.Eminem;
import com.musicapp.music_backend.entities.Energetic;
import com.musicapp.music_backend.entities.Hanumankind;
import com.musicapp.music_backend.entities.Happy;
import com.musicapp.music_backend.entities.Honey_singh;
import com.musicapp.music_backend.entities.Kailash_kher;
import com.musicapp.music_backend.entities.Karan_auijla;
import com.musicapp.music_backend.entities.Pritam;
import com.musicapp.music_backend.entities.Romantic;
import com.musicapp.music_backend.entities.Sad;
import com.musicapp.music_backend.entities.Shaan;
import com.musicapp.music_backend.entities.Shreya_ghosal;
import com.musicapp.music_backend.entities.Song;
import com.musicapp.music_backend.entities.Sonu_nigam;
import com.musicapp.music_backend.entities.The_weekend;
import com.musicapp.music_backend.entities.Udit_narayan;
import com.musicapp.music_backend.repo.AR_repo;
import com.musicapp.music_backend.repo.Alka_repo;
import com.musicapp.music_backend.repo.Arjit_repo;
import com.musicapp.music_backend.repo.Bruno_repo;
import com.musicapp.music_backend.repo.Diljit_repo;
import com.musicapp.music_backend.repo.Eminem_repo;
import com.musicapp.music_backend.repo.Energetic_repo;
import com.musicapp.music_backend.repo.Hanumankind_repo;
import com.musicapp.music_backend.repo.Happy_repo;
import com.musicapp.music_backend.repo.Honey_repo;
import com.musicapp.music_backend.repo.Kailash_repo;
import com.musicapp.music_backend.repo.Karan_repo;
import com.musicapp.music_backend.repo.Pritam_repo;
import com.musicapp.music_backend.repo.Romantic_repo;
import com.musicapp.music_backend.repo.Sad_repo;
import com.musicapp.music_backend.repo.Shaan_repo;
import com.musicapp.music_backend.repo.Shreya_repo;
import com.musicapp.music_backend.repo.Song_repo;
import com.musicapp.music_backend.repo.Sonu_repo;
import com.musicapp.music_backend.repo.Udit_repo;
import com.musicapp.music_backend.repo.Weekend_repo;

@RestController
public class SongsController {
	
	@Autowired
	Arjit_repo arjit; 	
	
	@Autowired
	Sonu_repo sonu; 
	
	@Autowired
	Shaan_repo shaan;
	
	@Autowired
	AR_repo ar;
				
	@Autowired
	Pritam_repo pritam;
	
	@Autowired
	Weekend_repo weekend;
	
	@Autowired
	Udit_repo udit;
	
	@Autowired
	Alka_repo alka;
	
	@Autowired
	Shreya_repo shreya;
	
	@Autowired
	Honey_repo honey;
	
	@Autowired
	Karan_repo karan;
	
	@Autowired
	Eminem_repo eminem;
	
	@Autowired
	Diljit_repo diljit;
	
	@Autowired
	Bruno_repo bruno;
	
	@Autowired
	Hanumankind_repo hanu;
	
	@Autowired
	Kailash_repo kailash;
	
	@Autowired
	Romantic_repo rom;
	
	@Autowired
	Sad_repo sad;
	
	@Autowired
	Happy_repo happy;
	
	@Autowired
	Energetic_repo energetic;
	
	@Autowired
	Song_repo songs;

	@CrossOrigin(origins = "*")	
	@PostMapping("/Song")
	public Song getSong(@RequestBody InputValue inputValueObj){
		String inputvalue=inputValueObj.getInputValue();
		return songs.findByName(inputvalue);
	}
	
	@GetMapping("/Arijit")
	public List<Arjit_singh> getArijitsongs(){
		return arjit.findAll();
	}
	
	
	@GetMapping("/Sonu")
	public List<Sonu_nigam> getSonusongs(){
		return sonu.findAll();
	}
	
	@GetMapping("/Shaan")
	public List<Shaan> getShaansongs(){
		return shaan.findAll();
	}

	@GetMapping("/A.R.")
	public List<AR_rahman> getARsongs(){
		return ar.findAll();
	}
	
	@GetMapping("/Pritam")
	public List<Pritam> getPritamsongs(){
		return pritam.findAll();
	}
	
	@GetMapping("/The")
	public List<The_weekend> getWeekendongs(){
		return weekend.findAll();
	}

	@GetMapping("/Udit")
	public List<Udit_narayan> getUditsongs(){
		return udit.findAll();
	}
	
	@GetMapping("/Alka")
	public List<Alka_yagnik> getAlkasongs(){
		return alka.findAll();
	}
	
	@GetMapping("/Shreya")
	public List<Shreya_ghosal> getShreyasongs(){
		return shreya.findAll();
	}
	
	@GetMapping("/Honey")
	public List<Honey_singh> getHoneysongs(){
		return honey.findAll();
	}
	
	@GetMapping("/Karan")
	public List<Karan_auijla> getKaransongs(){
		return karan.findAll();
	}

	@GetMapping("/Eminem")
	public List<Eminem> getEminemsongs(){
		return eminem.findAll();
	}
	
	@GetMapping("/Diljit")
	public List<Diljit_dosanjh> getDiljitsongs(){
		return diljit.findAll();
	}
	@GetMapping("/Bruno")
	public List<Bruno_mars> getBrunosongs(){
		return bruno.findAll();
	}

	@GetMapping("/Hanumankind")
	public List<Hanumankind> getHanumankindsongs(){
		return hanu.findAll();
	}

	@GetMapping("/Kailash")
	public List<Kailash_kher> getKailashsongs(){
		return kailash.findAll();
	}
	
	@GetMapping("/Romantic")
	public List<Romantic> getRomancesongs(){
		return rom.findAll();
	}
	
	@GetMapping("/Sad")
	public List<Sad> getSadsongs(){
		return sad.findAll();
	}
	
	@GetMapping("/Happy")
	public List<Happy> getHappysongs(){
		return happy.findAll();
	}
	
	@GetMapping("/Energetic")
	public List<Energetic> getEnergeticsongs(){
		return energetic.findAll();
	}
	
}
