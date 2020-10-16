import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

public class Colors {
    static int color = new Color(174, 145, 184).getRGB();
    static int white = new Color(255,255,255).getRGB();

    public static void main(String[] args) throws Exception {
        BufferedImage colorImage = null;
        colorImage = ImageIO.read(new File("img/22.png"));
        getPurple(colorImage);
        ImageIO.write(colorImage, "png", new File("img/after.png"));

    }

    public static void getPurple(BufferedImage image){
        int width = image.getWidth();
        int height = image.getHeight();
        for(int w = 0; w < width; w++){
            for(int h = 0; h < height; h++){
                if(new Color (image.getRGB(w, h)).getRed() > new Color(100, 0, 0).getRed() &&
                        new Color (image.getRGB(w, h)).getRed() < new Color(200, 0, 0).getRed() &&
                        new Color (image.getRGB(w, h)).getGreen() > new Color(0, 70, 0).getGreen() &&
                        new Color (image.getRGB(w, h)).getGreen() < new Color(0, 200, 0).getGreen() &&
                        new Color (image.getRGB(w, h)).getBlue() > new Color(0, 0, 140).getBlue() &&
                        new Color (image.getRGB(w, h)).getBlue() < new Color(0, 0, 200).getBlue() &&
                        w > 500 && w < 950 && h > 330 && h < 390
                ) {
                    System.out.println("픽셀 위치: " + w  +" ," + h);
                }
                else{
                    image.setRGB(w, h, white);
                }
            }
        }
    }
}

/*
                if(new Color (image.getRGB(w, h)).getRed() > new Color(110, 0, 0).getRed() &&
                        new Color (image.getRGB(w, h)).getRed() < new Color(220, 0, 0).getRed() &&
                        new Color (image.getRGB(w, h)).getGreen() > new Color(0, 70, 0).getGreen() &&
                        new Color (image.getRGB(w, h)).getGreen() < new Color(0, 210, 0).getGreen() &&
                        new Color (image.getRGB(w, h)).getBlue() > new Color(0, 0, 120).getBlue() &&
                        new Color (image.getRGB(w, h)).getBlue() < new Color(0, 0, 220).getBlue()
                ) {
 */
