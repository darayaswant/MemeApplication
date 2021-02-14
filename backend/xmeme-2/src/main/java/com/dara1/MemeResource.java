package com.dara1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Optional;
@CrossOrigin(origins= {"http://65.1.94.231"})
@RestController
public class MemeResource {
	
	@Autowired
	MemeRepo repo;
	
	@GetMapping("memes")
	public ResponseEntity<ArrayList<Meme>> getMemes(){	
		return ResponseEntity.ok(repo.get100());
	}
	@GetMapping("memes/{id}")
	public ResponseEntity<Meme> getMeme(@PathVariable int id){
		Optional<Meme> val=repo.findById(id);
		if(val.isPresent()) {
			return  ResponseEntity.ok(val.get());
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	@DeleteMapping("memes/{id}")
	public void DeleteMeme(@PathVariable int id){
		repo.deleteById(id);
	}
	
	@PostMapping(path = "memes", consumes = "application/json", produces = "application/json")
	public IdResponse CreateMeme(@RequestBody Meme m) {
		Meme temp=repo.save(m);
		IdResponse idresponse=new IdResponse();
		idresponse.setId(temp.getId());
		return idresponse;
	}
	
	@PatchMapping("memeurl/{id}")
	public ResponseEntity<?> UpdateMemeByUrl(@PathVariable int id,@RequestBody UrlRequest urlrequest){
		Optional<Meme> value=repo.findById(id);
		Meme temp=value.get();
		temp.setUrl(urlrequest.getUrl());
		repo.save(temp);
		return ResponseEntity.ok("meme successfully updated");
	}
	@PatchMapping("memecaption/{id}")
	public ResponseEntity<?> UpdateMemeByCaption(@PathVariable int id,@RequestBody CaptionRequest captionrequest){
		Optional<Meme> value=repo.findById(id);
		Meme temp=value.get();
		temp.setCaption(captionrequest.getCaption());
		repo.save(temp);
		return ResponseEntity.ok("meme successfully updated");
	}
	
	
	
	

}
